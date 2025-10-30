"use client";

import React from "react";

const Background: React.FC = () => {
  return (
    <>
      {/* Background Border Grid */}
      <div className="bg-border-box fixed inset-0 z-0 pointer-events-none">
        <div className="bg-border"></div>
        <div className="bg-border"></div>
        <div className="bg-border"></div>
        <div className="bg-border"></div>
        <div className="bg-border"></div>
        <div className="bg-border"></div>
      </div>

      <style jsx>{`
        .bg-border-box {
          position: fixed;
          inset: 0%;
          z-index: 0;
          display: flex;
          width: 100%;
          max-width: 1326px;
          margin-right: auto;
          margin-left: auto;
          padding-right: 16px;
          padding-left: 16px;
          justify-content: space-between;
          pointer-events: none;
        }

        .bg-border {
          width: 1px;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </>
  );
};

export default Background;
