import { WishItemV2 } from '@apis/wish/type';
import TempleStayCard from '@components/card/templeStayCard/TempleStayCard';
import type { Meta, StoryObj } from '@storybook/react';

const mockItem: WishItemV2 = {
  templestayId: 1,
  templeName: '화계사',
  templestayName: '[화계사] 템플스테이',
  region: '서울',
  type: '휴식형',
  imgUrl: 'https://www.templestay.com/images/templeinfo/12_1.jpg',
  wish: false, // liked가 아닌 wish
};

const meta = {
  title: 'Common/card/TempleStayCard',
  component: TempleStayCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    item: mockItem,
    layout: 'horizontal',
    onToggleWishlist: (templestayId: number, liked: boolean) =>
      alert(`Wishlist ${templestayId}: ${liked}`),
    link: 'https://www.gototemplestay.com/',
  },
} satisfies Meta<typeof TempleStayCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const horizontalWishCard: Story = {
  args: {
    layout: 'horizontal',
  },
};

export const verticalWishCard: Story = {
  args: {
    layout: 'vertical',
  },
};
