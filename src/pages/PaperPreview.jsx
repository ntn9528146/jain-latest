import React from 'react';
import PaperViewer from '../components/paper/PaperViewer';

export default function PaperPreview({ paperData }) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <PaperViewer paperData={paperData} />
    </div>
  );
}
