import Icon from '@assets/svgs';
import BasicBtn from '@components/common/button/basicBtn/BasicBtn';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'grayOutlined' | 'blackOutlined' | 'lightGrayOutlined';
  size?: 'large' | 'medium' | 'small';
  label: string;
  leftIcon?: keyof typeof Icon;
  rightIcon?: keyof typeof Icon;
  isActive: boolean;
}

const meta = {
  title: 'Common/Button/BasicBtn',
  component: BasicBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'grayOutlined', 'blackOutlined', 'lightGrayOutlined', 'green'],
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small'],
    },

    label: {
      control: { type: 'text' },
    },
    isActive: {
      control: { type: 'boolean' },
    },
    leftIcon: {
      control: { type: 'select' },
      options: Object.keys(Icon),
    },
    rightIcon: {
      control: { type: 'select' },
      options: Object.keys(Icon),
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Button',
    isActive: false,
    leftIcon: 'IcnCloseLargeGray',
    rightIcon: 'IcnCloseLargeGray',
  },
} satisfies Meta<typeof BasicBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const createButtonStory = (
  variant: ButtonProps['variant'],
  label: string,
  leftIcon?: keyof typeof Icon,
  rightIcon?: keyof typeof Icon,
) => ({
  args: {
    variant,
    label,
    leftIcon,
    rightIcon,
  },
  argsType: {
    variant: {
      control: false,
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
  },
});

export const Primary: Story = createButtonStory('primary', 'Primary Button', 'IcnCloseLargeGray');

export const grayOutlined: Story = createButtonStory(
  'grayOutlined',
  'GrayOutlined Button',
  undefined,
  'IcnCloseLargeGray',
);

export const blackOutlined: Story = createButtonStory('blackOutlined', 'BlackOutlined Button');
