import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';

const mockChatList = [
  {
    avatar: 'B',
    name: 'Button',
    message: '안녕하세요?',
  },
  {
    avatar: 'C',
    name: 'Caddy',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'D',
    name: 'Devleop',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'E',
    name: 'Ether Net',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'D',
    name: 'Devleop',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'E',
    name: 'Ether Net',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'D',
    name: 'Devleop',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'E',
    name: 'Ether Net',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'D',
    name: 'Devleop',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'E',
    name: 'Ether Net',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'D',
    name: 'Devleop',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'E',
    name: 'Ether Net',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'D',
    name: 'Devleop',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
  {
    avatar: 'E',
    name: 'Ether Net',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a purus congue mauris tincidunt porttitor at auctor sapien. Cras venenatis massa id dui convallis elementum id eget erat.',
  },
];

const ChatList = () => {
  const selectedId = 1;
  return (
    <List
      sx={{ height: '100%', overflowY: 'auto' }}
      role="list"
      aria-label="chat list"
    >
      {mockChatList.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemButton
              selected={selectedId === index}
              // onClick={() => onSelect(item.id)}
              sx={{
                alignItems: 'flex-start',
                backgroundColor:
                  selectedId === index ? 'action.selected' : 'inherit',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Avatar>{item.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={item.message}
                slotProps={{
                  secondary: {
                    sx: {
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          {index < mockChatList.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default ChatList;
