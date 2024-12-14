'use client';

import React, { useState, useEffect } from 'react';

const CountUp = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev < target) return prev + 5;
        clearInterval(intervalId);
        return target;
      });
    }, 10); // Adjust speed of counting
    return () => clearInterval(intervalId);
  }, [target]);

  return <span>{count}</span>;
};

const StatsSection = () => {
  return (
    <section className="bg-primary-50 py-10 h-auto">
      <div className="wrapper grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div className="flex flex-col items-center text-center gap-7">
          <h3 className="text-3xl font-bold">
            <CountUp target={100} /> +
          </h3>
          <p className="text-lg">Events</p>
        </div>
        <div className="flex flex-col items-center text-center gap-7">
          <h3 className="text-3xl font-bold">
            <CountUp target={1000} /> +
          </h3>
          <p className="text-lg">Students</p>
        </div>
        <div className="flex flex-col items-center text-center gap-7">
          <h3 className="text-3xl font-bold">
            <CountUp target={1} /> 
          </h3>
          <p className="text-lg">Platform</p>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .bg-primary-50 {
          background-color: #f3d8f3; /* Light background color */
        }

        .text-3xl {
          font-size: 3.5rem; /* Adjust size as per your need */
          color: #a11c5e;
        }

        .font-bold {
          font-weight: bold;
        }

        .sm\\:grid-cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .gap-10 {
          gap: 2.5rem; /* Controls the gap between columns */
        }

        .flex {
          display: flex;
        }

        .flex-col {
          flex-direction: column;
        }

        .items-center {
          align-items: center;
        }

        .text-center {
          text-align: center;
        }

        .py-10 {
          padding-top: 5.5rem;
          padding-bottom: 5.5rem;
        }

        .text-lg {
          font-size: 2.25rem; /* Adjust size for the text below the number */
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
