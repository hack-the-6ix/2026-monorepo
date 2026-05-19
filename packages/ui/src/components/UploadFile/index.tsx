'use client';

import { ChangeEvent, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import { Upload, X } from 'lucide-react';

import { InputGroup, InputGroupProps } from '../InputGroup';
import { Typography } from '../Typography';

import './index.css';

export interface FileUploadProps extends InputGroupProps<'div'> {
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const truncateFileName = (name: string, maxLength = 25): string => {
  if (name.length <= maxLength) return name;
  const base = name.slice(0, maxLength - 3);
  return `${base}...`;
};

export function FileUpload({
  onFileSelect,
  accept = '.pdf',
  className,
  ...props
}: FileUploadProps) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(props.ref, () => ref.current!);

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
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <InputGroup {...props} ref={ref} className={className}>
      <div className={cn('upload', className)}>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
          className="upload__input"
          aria-describedby={`${props.id}--${props.name}--status`}
          aria-invalid={props.info?.type === 'error'}
          required={props.required}
          disabled={props.disabled}
          id={`${props.id}--input`}
          name={props.name}
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
                truncateFileName(file.name)
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
    </InputGroup>
  );
}
