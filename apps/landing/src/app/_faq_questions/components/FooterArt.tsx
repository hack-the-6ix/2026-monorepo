'use client';

import React from 'react';
import styles from './figmaFooter.module.css';
import { Typography } from '@hackthe6ix/ui';

const ASSETS = {
  vector125:
    'https://www.figma.com/api/mcp/asset/02111b0a-1694-4da2-8c60-e95f7fbd3de0',
  vector124:
    'https://www.figma.com/api/mcp/asset/8e7b79f0-5bba-4e51-8149-53e7c691c9bb',
  vector126:
    'https://www.figma.com/api/mcp/asset/a25a7d53-c6f8-419d-8f80-5aa1a7c41c77',
  vector127:
    'https://www.figma.com/api/mcp/asset/96c0c48a-f296-4769-8a5e-f683139fd386',
  vector128:
    'https://www.figma.com/api/mcp/asset/f5727c69-5cf0-43f4-a580-fe320e8421e1',
  vector121:
    'https://www.figma.com/api/mcp/asset/6312ca31-014e-4352-8ef6-64d23e6adb36',
  vector122:
    'https://www.figma.com/api/mcp/asset/60c38424-82a1-4571-a732-ead2bcb15b55',
  vector129:
    'https://www.figma.com/api/mcp/asset/e71b65c8-6395-403f-aae6-f7ebd06e6b64',
  vector574:
    'https://www.figma.com/api/mcp/asset/444808bd-a39d-42e7-9d97-d31365fcd44e',
};

export default function FooterArt() {
  return (
    <div className={styles.footerArt} aria-hidden>
      <div className={`${styles.artLayer} ${styles.artLarge}`}>
        <img src={ASSETS.vector121} alt="" style={{ width: '100%' }} />
      </div>

      <div className={`${styles.artLayer} ${styles.artMedium}`}>
        <img src={ASSETS.vector122} alt="" style={{ width: '100%' }} />
      </div>

      <div className={`${styles.artLayer} ${styles.artSmall}`}>
        <img src={ASSETS.vector129} alt="" style={{ width: '100%' }} />
      </div>

      <img className={styles.decoration1} src={ASSETS.vector125} alt="" />
      <img className={styles.decoration2} src={ASSETS.vector124} alt="" />
      <img className={styles.decorationSmall} src={ASSETS.vector126} alt="" />

      <div className={styles.email}>
        <Typography textSize="heading-sm" textColor="text-accent-400">
          hello@hackthe6ix.com
        </Typography>
      </div>

      <img className={styles.teacup} src={ASSETS.vector574} alt="teacup" />
    </div>
  );
}
