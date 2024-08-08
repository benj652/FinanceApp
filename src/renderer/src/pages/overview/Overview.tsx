import Card from '@renderer/components/Card';
import React from 'react';

const Overview: React.FC = () => {
  return (
    <div className="overflow-auto">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Savings Overview:</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="sm:max-w[150px] md:max-w-[400px] lg:max-w-[700px]">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sit cum cupiditate.
          Odit labore cupiditate ad. Eligendi non suscipit vitae sed laboriosam repellendus vero
          totam eaque quis, deleniti ullam doloremque?{' '}
        </Card>
        <Card className="sm:max-w[150px] md:max-w-[400px] lg:max-w-[700px]">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sit cum cupiditate.
          Odit labore cupiditate ad. Eligendi non suscipit vitae sed laboriosam repellendus vero
          totam eaque quis, deleniti ullam doloremque?{' '}
        </Card>
        <Card className="sm:max-w[150px] md:max-w-[400px] lg:max-w-[700px]">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sit cum cupiditate.
          Odit labore cupiditate ad. Eligendi non suscipit vitae sed laboriosam repellendus vero
          totam eaque quis, deleniti ullam doloremque?{' '}
        </Card>
        <Card className="sm:max-w[150px] md:max-w-[400px] lg:max-w-[700px]">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sit cum cupiditate.
          Odit labore cupiditate ad. Eligendi non suscipit vitae sed laboriosam repellendus vero
          totam eaque quis, deleniti ullam doloremque?{' '}
        </Card>
      </div>
    </div>
  );
};

export default Overview;
