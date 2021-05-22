import React from 'react';
import { IconButton, useColorMode, ScaleFade, Tooltip } from '@chakra-ui/react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import useSound from 'use-sound';
// import MobileMenuButton from "./mobile-menu-button";

const ThemeToggle = () => {
  const mobile = false;
  const { colorMode, toggleColorMode } = useColorMode();
  const [play] = useSound('/lightswitch.mp3', {
    volume: 0.05,
    sprite: {
      on: [0, 300],
      off: [500, 300],
    },
  });

  const handleClick = () => {
    toggleColorMode();
    colorMode === 'dark' ? play({ id: 'on' }) : play({ id: 'off' });
  };

  return (
    <Tooltip
      label={colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
      aria-label="A tooltip"
    >
      {mobile ? (
        <MobileMenuButton
          label={colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          icon={
            colorMode === 'dark' ? (
              <ScaleFade in>
                <HiOutlineSun size={mobile ? 22 : 18} />
              </ScaleFade>
            ) : (
              <ScaleFade in>
                <HiOutlineMoon size={mobile ? 22 : 18} />
              </ScaleFade>
            )
          }
          onClick={handleClick}
        />
      ) : (
        <IconButton
          aria-label="Switch theme"
          variant={mobile ? 'ghost' : 'outline'}
          icon={
            colorMode === 'dark' ? (
              <ScaleFade in>
                <HiOutlineSun size={mobile ? 22 : 18} />
              </ScaleFade>
            ) : (
              <ScaleFade in>
                <HiOutlineMoon size={mobile ? 22 : 18} />
              </ScaleFade>
            )
          }
          onClick={handleClick}
        />
      )}
    </Tooltip>
  );
};
export default ThemeToggle;
