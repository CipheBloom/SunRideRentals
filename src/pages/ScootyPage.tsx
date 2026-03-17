import { useState, useEffect } from 'react';
import { ScootyCard } from '@/components/ScootyCard';
import { categoryLabels } from '@/data/scooty';
import { Button } from '@/components/ui/button';
import type { Scooty } from '@/types';

export function ScootyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scooty, setScooty] = useState<Scooty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScootys();
  }, []);

  const loadScootys = () => {
    try {
      setLoading(true);
      const data = localStorage.getItem('sunride_scootys');
      setScooty(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error('Error loading scootys:', error);
      setScooty([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredscooty = selectedCategory === 'all' 
    ? scooty 
    : scooty.filter((scooty: Scooty) => scooty.category === selectedCategory);

  const categories = ['all', ...new Set(scooty.map((scooty: Scooty) => scooty.category))];

  if (loading) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading scootys...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Our scooty</h1>
          <p className="text-gray-500">
            Choose from our wide selection of premium scooty for rent
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All scooty' : categoryLabels[category] || category}
            </Button>
          ))}
        </div>

        {/* scooty Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredscooty.map((scooty) => (
            <ScootyCard key={scooty.id} scooty={scooty} />
          ))}
        </div>

        {filteredscooty.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No scooty found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
