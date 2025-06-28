import React from 'react';
import { categories } from '../data/products';
import * as Icons from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 py-4 overflow-x-auto">
          <button
            onClick={() => onCategorySelect('All')}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Icons.Grid3X3 size={24} />
            <span className="text-xs font-medium">All</span>
          </button>
          
          {categories.map((category) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.name)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === category.name
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent size={24} />
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;