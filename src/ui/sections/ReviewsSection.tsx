"use client";

import React from "react";
import colors from "../../theme/colors";

const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Card - What People Talk About Us */}
          <div className="bg-gray-100 text-black rounded-3xl p-8 relative">
            <p className="text-sm font-medium mb-6 tracking-wide">● REVIEWS</p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              WHAT
              <br />
              PEOPLE
              <br />
              TALK
              <br />
              ABOUT US
            </h2>

            {/* Circular Badge */}
            <div className="absolute bottom-8 left-8">
              <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center relative">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    99
                  </div>
                  <div className="text-xs font-medium">TRUSTED</div>
                </div>
                <div className="absolute top-2 right-2 text-xs">BY</div>
                <div className="absolute bottom-2 left-2 text-xs">CLIENTS</div>
              </div>
            </div>
          </div>

          {/* Right Card - Testimonials */}
          <div className="bg-gray-800 text-white rounded-3xl p-8 space-y-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-700 rounded-2xl p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-sm">DIRECTOR, ZUMARCONS</h4>
                  <p className="text-xs text-gray-400">TIM WORTHY</p>
                </div>
                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Featured */}
            <div
              className="rounded-2xl p-6 relative"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-sm text-black">
                    CEO AT ARCHIN CO.
                  </h4>
                  <p className="text-xs text-black/70">BRIAN LEE</p>
                </div>
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                </div>
                <p className="text-sm text-black leading-relaxed">
                  Based on what we&apos;ve learned about your audience, data,
                  and tech stack, we bring it all together to build and
                  implement customized digital marketing strategies that extend
                  your reach and amplify your mission.
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-700 rounded-2xl p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-sm">CTO, ITECH CO.</h4>
                  <p className="text-xs text-gray-400">MOHAMED MOUSSA</p>
                </div>
                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
