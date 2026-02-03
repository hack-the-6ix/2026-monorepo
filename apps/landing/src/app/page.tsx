'use client';

import React from 'react';
import Image from 'next/image';

import { assets } from '../lib/assets';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div
      className={styles.landingPage}
      data-name="landing page"
      data-node-id="892:165"
    >
      {/* Main UI Content */}
      <div
        className={styles.ui}
        data-name="ui"
        data-node-id="892:806"
      >
        {/* Logo */}
        <div
          className={styles.logo}
          data-name="Logo"
          data-node-id="892:330"
        >
          <Image
            src={assets.logo}
            alt="Hack the 6ix Logo"
            width={30}
            height={75.64}
            className={styles.image}
          />
        </div>

        {/* Hero Content */}
        <div
          className={styles.content}
          data-name="content"
          data-node-id="892:756"
        >
          {/* Event Info */}
          <div
            className={styles.eventInfo}
            data-node-id="892:757"
          >
            <div
              className={styles.eventDetails}
              data-node-id="892:758"
            >
              <p
                className={styles.eventDetailText}
                data-node-id="892:759"
              >
                July 17-19, 2026
              </p>
              <p
                className={styles.eventDetailDot}
                data-node-id="892:760"
              >
                ⋅
              </p>
              <p
                className={styles.eventDetailText}
                data-node-id="892:761"
              >
                Bahen Centre
              </p>
              <p
                className={styles.eventDetailDot}
                data-node-id="892:762"
              >
                ⋅
              </p>
              <p
                className={styles.eventDetailText}
                data-node-id="892:763"
              >
                In-Person
              </p>
            </div>

            {/* Main Title */}
            <p
              className={styles.mainTitle}
              data-node-id="892:764"
            >
              Hack the 6ix
            </p>

            {/* Subtitle */}
            <p
              className={styles.subtitle}
              data-node-id="892:765"
            >
              <span className={styles.subtitleWhite}>{`Tumble down the rabbit hole and `}</span>
              <span className={styles.subtitleGold}>
                create
              </span>
            </p>
          </div>

          {/* Form Section */}
          <div
            className={styles.formSection}
            data-node-id="892:766"
          >
            <p
              className={styles.formDescription}
              data-node-id="892:767"
            >
              Applications open soon! Sign up to receive the latest updates in
              your inbox.
            </p>

            <form
              className={styles.formRow}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle submission (e.g., call an API route)
              }}
            >
              <div
                className={styles.textFieldWrapper}
                data-name="Text Field w/ Label"
                data-node-id="892:769"
              >
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>

                <div
                  className={styles.textField}
                  data-name="Text Field"
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    className={styles.placeholderText}
                  />

                  <span
                    className={styles.icon}
                    aria-hidden="true"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.expandMore}
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#99a1af"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={styles.button}
                aria-label="Sign up for updates"
              >
                <span className={styles.buttonText}>
                  Sign up
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
