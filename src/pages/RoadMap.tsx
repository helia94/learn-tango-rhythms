
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const RoadMap = () => {
  const { t } = useTranslation();

  const danceConceptPairs = [
    { left: "Dancing fast", right: "Dancing slow" },
    { left: "Dancing small", right: "Dancing big" },
    { left: "Dancing high", right: "Dancing low" },
    { left: "Dancing circular", right: "Dancing linear" },
    { left: "With control", right: "Without control" },
    { left: "Full weight transfer", right: "Rebounds" },
    { left: "Expanding", right: "Shrinking" },
    { left: "High body tension", right: "Low body tension" },
    { left: "Feet always on the floor", right: "Feet off the floor" },
    { left: "Pushing the floor", right: "Not pushing the floor" },
    { left: "Leading every step", right: "Not leading every step" },
    { left: "Same steps", right: "Different steps" },
    { left: "Few steps", right: "Many steps" },
    { left: "Dancing rhythm", right: "Dancing melody" },
    { left: "Facing partner", right: "Turning away" },
    { left: "Accelerating", right: "Decelerating" }
  ];

  const singleConcepts = [
    "Dancing rubato",
    "Marcato in 2 vs in 4",
    "The normal syncopa",
    "The double syncopa", 
    "The drag syncopa",
    "Dance 4-1",
    "Dance triplets",
    "Dance like a jellyfish",
    "Dance like water",
    "Dance like sculptures",
    "Dance the accents"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-warm-brown hover:text-burnt-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Map className="w-12 h-12 text-burnt-orange" />
            <h1 className="boho-title text-5xl md:text-7xl font-display">
              ROAD MAP
            </h1>
          </div>
          
          <div className="boho-panel p-6">
            <p className="boho-subtitle text-lg text-warm-brown">
              Explore the fundamental concepts and contrasts in tango dancing
            </p>
          </div>
        </div>

        {/* Dance Concept Pairs */}
        <div className="mb-12">
          <h2 className="boho-subtitle text-2xl text-center mb-8 text-burnt-orange">
            Dance Contrasts
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {danceConceptPairs.map((pair, index) => (
              <div key={index} className="boho-panel p-6">
                <div className="flex items-center justify-between">
                  <div className="text-warm-brown font-medium">
                    {pair.left}
                  </div>
                  <div className="text-2xl text-burnt-orange mx-4">
                    ↔
                  </div>
                  <div className="text-warm-brown font-medium">
                    {pair.right}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single Concepts */}
        <div className="mb-12">
          <h2 className="boho-subtitle text-2xl text-center mb-8 text-burnt-orange">
            Advanced Concepts
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {singleConcepts.map((concept, index) => (
              <div key={index} className="boho-panel p-4 text-center">
                <div className="text-warm-brown font-medium">
                  {concept}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="boho-panel p-8">
            <h3 className="boho-subtitle text-xl mb-4 text-burnt-orange">
              Ready to Practice?
            </h3>
            <p className="text-warm-brown mb-6">
              Explore these concepts through rhythm and movement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/rhythmlab" 
                className="boho-button text-lg px-8 py-4 inline-block"
              >
                Rhythm Lab
              </Link>
              <Link 
                to="/rhythmlab/quiz" 
                className="boho-button text-lg px-8 py-4 inline-block"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
