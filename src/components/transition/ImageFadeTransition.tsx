import React, { Component } from 'react';
import Image from 'next/image';

interface IProps {
  src: string;
  alt: string;
  fill?: true;
  style?: object;
  height?: number;
  width?: number;
  className?: string;
}
class ImageFadeTransition extends Component<IProps> {
  state = {
    topSrc: this.props.src,
    bottomOpacity: 0,
    bottomSrc: this.props.src,
  };

  timeout: ReturnType<typeof setInterval> | undefined;

  UNSAFE_componentWillReceiveProps(newProps: IProps) {
    const oldSrc = this.state.topSrc;
    const newSrc = newProps.src;
    if (newSrc !== oldSrc) {
      this.setState({ bottomSrc: false, topSrc: false }, () =>
        this.setState(
          // Opacity less than 1 takes precendence in stacking order
          { bottomSrc: oldSrc, topSrc: newSrc, bottomOpacity: 0.99 },
          () => {
            // One of the few times setTimeout does wonders, this is for
            // getting fade out transition without css keyframe
            if (!this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(
              () => this.setState({ bottomOpacity: 0 }),
              20,
            );
          },
        ),
      );
    }
  }
  render() {
    const { style, alt, className, fill, height, width } = this.props;
    const { topSrc, bottomOpacity, bottomSrc } = this.state;
    return (
      <>
        {topSrc && (
          <Image
            fill={fill}
            height={height}
            width={width}
            className={`${className} text-xs text-white`}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              ...style,
            }}
            src={topSrc}
            alt={alt}
          />
        )}
        {bottomSrc && (
          <Image
            fill={fill}
            height={height}
            width={width}
            className={`${className} text-xs text-white`}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              ...style,
              ...{
                opacity: bottomOpacity,
                transition: `opacity ${500 / 1000}s ${'ease'} ${0 / 1000}s`,
              },
            }}
            src={bottomSrc}
            alt={alt}
          />
        )}
      </>
    );
  }
}

export default ImageFadeTransition;
