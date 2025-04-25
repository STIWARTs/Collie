import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@mui/material';
import React, { Component } from 'react';
import TooltipDark from 'components/tooltip/TooltipDark';

const ScrollButtonID = 'scroll-to-top-button';

class ScrollToTopButton extends Component {
  state = {};

  componentDidMount() {
    document.getElementById(ScrollButtonID)?.addEventListener('click', () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 150);
    });
  }

  render() {
    return (
      <div className="absolute right-0 top-0 -mt-6">
        <TooltipDark
          arrow
          placement="top"
          title={<h6 className="font-[400]">Back to Top</h6>}
        >
          <IconButton
            id={ScrollButtonID}
            aria-label="scroll-to-top-button"
            disableFocusRipple
            className="button-text-lower group flex h-[47px] w-[47px] items-center justify-center rounded-lg bg-[#2E2E2E] text-white opacity-80 transition-all duration-300 hover:bg-[#303030] hover:opacity-100"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff50 !important',
              },
            }}
          >
            <ChevronUpIcon className="h-5 w-5 opacity-80 group-hover:opacity-100" />
          </IconButton>
        </TooltipDark>
      </div>
    );
  }
}

export default ScrollToTopButton;
