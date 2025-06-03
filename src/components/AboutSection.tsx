
import React from 'react';
import { Target, Heart, Lightbulb, Rocket } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                About OnnoRokom Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Founded with the vision of creating meaningful connections, OnnoRokom Community 
                is more than just a networking platform. We're a carefully curated ecosystem 
                where professionals, creators, and innovators come together to share ideas, 
                collaborate on projects, and build lasting relationships.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our commitment to privacy, quality, and authentic engagement sets us apart 
                in the digital landscape. Every member is valued, every connection is meaningful, 
                and every interaction contributes to our collective growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Our Mission</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Empowering connections that matter
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Heart className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Our Values</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Authenticity, respect, and growth
                </p>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Innovation Hub</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Where creative minds meet cutting-edge technology to build the future together.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <Rocket className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Growth Platform</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Accelerate your personal and professional development through meaningful collaborations.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-8 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-4">Join Our Journey</h3>
              <p className="mb-6">
                Be part of a community that's reshaping how people connect and collaborate online.
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
