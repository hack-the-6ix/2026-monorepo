'use client';

import React from 'react';
import Image from 'next/image';

import { assets } from '../lib/assets';
import { EVENT_INFO, HERO_CONTENT, FORM_CONTENT } from '../lib/constants';
import styles from './page.module.css';

/**
 * Landing Page Component
 * 
 * Fixed viewport: 1440x1080px (no scroll)
 * 
 * Structure:
 * - Layer 1 (z-0): Background elements (gradient, spotlight, CN Tower)
 * - Layer 2 (z-10): Decorative SVGs (flowers, butterflies, unions, groups)
 * - Layer 3 (z-20): Static content (logo, hero text, placeholder button)
 */
export default function LandingPage() {
  return (
    <div className={styles.landingPage} data-name="landing page">
      {/* ============================================================
          LAYER 1: Background Elements (z-index: 0)
          ============================================================ */}
      <div className={styles.backgroundLayer}>
        {/* Background graphics - large decorative SVG */}
        <div className={styles.backgroundGraphics}>
          <Image
            src={assets.group499}
            alt=""
            width={2022}
            height={2095}
            className={styles.assetImage}
            priority
          />
        </div>

        {/* Spotlight effect */}
        <div className={styles.spotlight}>
          <Image
            src={assets.spotlight}
            alt=""
            width={1905}
            height={1293}
            className={styles.assetImage}
            priority
          />
        </div>

        {/* CN Tower skyline background */}
        <div className={styles.cnTowerBg}>
          <Image
            src={assets.cnTowerBg}
            alt=""
            width={2668}
            height={480}
            className={styles.assetImage}
            priority
          />
        </div>
      </div>

      {/* ============================================================
          LAYER 2: Decorative Elements (z-index: 10)
          ============================================================ */}
      <div className={styles.decorativeLayer}>
        {/* Top Graphics - flower shapes */}
        <div className={styles.topGraphics}>
          <div className={styles.group55}>
            <Image
              src={assets.group55}
              alt=""
              width={224}
              height={268}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group56}>
            <Image
              src={assets.group56}
              alt=""
              width={201}
              height={262}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group57}>
            <Image
              src={assets.group57}
              alt=""
              width={197}
              height={260}
              className={styles.assetImage}
            />
          </div>
        </div>

        {/* Butterflies */}
        <div className={styles.butterflies}>
          <Image
            src={assets.butterflies}
            alt=""
            width={214}
            height={533}
            className={styles.assetImage}
          />
        </div>

        {/* Trees/Cave graphics area */}
        <div className={styles.caveGraphics}>
          <Image
            src={assets.group73}
            alt=""
            width={534}
            height={394}
            className={styles.assetImage}
          />
        </div>

        {/* Lower Right Graphics Group */}
        <div className={styles.lowerRightGraphics}>
          <div className={styles.group112}>
            <Image
              src={assets.group112}
              alt=""
              width={882}
              height={562}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.union1}>
            <Image
              src={assets.union1}
              alt=""
              width={435}
              height={257}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group71}>
            <Image
              src={assets.group71}
              alt=""
              width={64}
              height={77}
              className={styles.assetImage}
            />
          </div>
        </div>

        {/* Lower Left Graphics Group */}
        <div className={styles.lowerLeftGraphics}>
          <div className={styles.union}>
            <Image
              src={assets.union}
              alt=""
              width={1058}
              height={674}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group74}>
            <Image
              src={assets.group74}
              alt=""
              width={1104}
              height={278}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group103}>
            <Image
              src={assets.group103}
              alt=""
              width={141}
              height={105}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group104}>
            <Image
              src={assets.group104}
              alt=""
              width={171}
              height={127}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group120}>
            <Image
              src={assets.group120}
              alt=""
              width={1013}
              height={347}
              className={styles.assetImage}
            />
          </div>
          <div className={styles.group14}>
            <Image
              src={assets.group14}
              alt=""
              width={52}
              height={102}
              className={styles.assetImage}
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          LAYER 3: Content Elements (z-index: 20)
          ============================================================ */}
      <div className={styles.contentLayer}>
        <div className={styles.heroUi}>
          {/* Logo */}
          <div className={styles.logo}>
            <Image
              src={assets.logo}
              alt="Hack the 6ix Logo"
              width={30}
              height={76}
              className={styles.logoImage}
              priority
            />
          </div>

          {/* Hero Content */}
          <div className={styles.content}>
            {/* Event Info */}
            <div className={styles.eventInfo}>
              <div className={styles.eventDetails}>
                <p className={styles.eventDetailText}>{EVENT_INFO.date}</p>
                <p className={styles.eventDetailDot}>⋅</p>
                <p className={styles.eventDetailText}>{EVENT_INFO.location}</p>
                <p className={styles.eventDetailDot}>⋅</p>
                <p className={styles.eventDetailText}>{EVENT_INFO.format}</p>
              </div>

              {/* Main Title */}
              <h1 className={styles.mainTitle}>{HERO_CONTENT.title}</h1>

              {/* Subtitle */}
              <p className={styles.subtitle}>
                <span className={styles.subtitleWhite}>{HERO_CONTENT.subtitlePrefix}</span>
                <span className={styles.subtitleGold}>{HERO_CONTENT.subtitleHighlight}</span>
              </p>
            </div>

            {/* Form Section */}
            <div className={styles.formSection}>
              <p className={styles.formDescription}>{FORM_CONTENT.description}</p>

              <div className={styles.formRow}>
                {/* Text Field */}
                <div className={styles.textFieldWrapper}>
                  <label htmlFor="email" className={styles.srOnly}>
                    Email address
                  </label>
                  <div className={styles.textField}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={FORM_CONTENT.placeholder}
                      className={styles.textFieldInput}
                    />
                  </div>
                </div>

                {/* Placeholder Button */}
                <button type="button" className={styles.button} aria-label="Sign up for updates">
                  <span className={styles.buttonText}>{FORM_CONTENT.buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
