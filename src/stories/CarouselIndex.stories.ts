import CarouselIndex from '@components/carousel/popularCarousel/CarouselIndex';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Carousel/PopularCarousel/CarouselIndex',
  component: CarouselIndex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: { type: 'number' },
    },
    displayIndex: {
      control: { type: 'number' },
    },
  },
  args: {
    total: 3,
    displayIndex: 2,
  },
} satisfies Meta<typeof CarouselIndex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
