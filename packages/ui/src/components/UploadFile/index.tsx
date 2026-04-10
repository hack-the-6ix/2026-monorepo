import { ChangeEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { Upload, X } from 'lucide-react';

import { Typography } from '../Typography';

import './index.css';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
  status?: 'error' | 'warning';
  disabled?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept = '.pdf',
  className,
  status,
  disabled,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the click from triggering the file input
    setFile(null);
    if (inputRef.current) inputRef.current.value = ''; // Reset input
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      className={cn('upload', className)}
      style={
        {
          '--input-group-status':
            status ? `var(--color-${status}-500)` : undefined,
        } as React.CSSProperties
      }
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        disabled={disabled}
        className="upload__input"
      />
      <div className="upload__content">
        <Upload className="upload__icon" />
        <div className="upload__info">
          <Typography
            as="span"
            textSize="paragraph-sm"
            textWeight="bold"
            className="text-primary"
          >
            {file ?
              file.name
            : <>
                Drop files here or{' '}
                <span className="upload__browse"> browse </span>
              </>
            }
          </Typography>
          <Typography
            as="span"
            textSize="paragraph-sm"
            className="text-primary"
          >
            {file ?
              `Size: ${formatFileSize(file.size)}`
            : `Accepted file format: ${accept.replaceAll('.', '')}`}
          </Typography>
        </div>
        {file ?
          <X className="cancel__icon" onClick={handleClear} />
        : <></>}
      </div>
    </div>
  );
}
