import PopularCard from '@components/card/popularCard/PopularCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Card/PopularCard',
  component: PopularCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ranking: {
      control: { type: 'number' },
    },
    templestayName: {
      control: { type: 'text' },
    },
    templeLoc: {
      control: { type: 'text' },
    },
    templeImg: {
      control: { type: 'text' },
    },
    templeName: {
      control: { type: 'text' },
    },

    isLiked: {
      control: { type: 'boolean' },
    },
    onLikeToggle: {
      action: 'onLikeToggle',
    },
  },
  args: {
    ranking: 1,
    templestayName: '봉선사 사부대중과 함께하는 선명상',
    templeLoc: '경기',
    templeImg:
      'https://img.danawa.com/images/descFiles/6/110/5109431_agiLaciMHn_1659098198501.jpeg',
    templeName: '봉선사',
    link: 'https://www.gototemplestay.com/',
    isLiked: false,
    templestayId: 123,
    onLikeToggle: (id) => alert(`Toggled like for ID: ${id}`),
    onClick: () => alert('Card clicked!'),
  },
} satisfies Meta<typeof PopularCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
