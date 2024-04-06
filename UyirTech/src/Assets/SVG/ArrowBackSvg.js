import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowBackSvg(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill="#777777"
      />
    </Svg>
  );
}

export default ArrowBackSvg;
