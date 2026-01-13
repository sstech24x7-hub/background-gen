import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={600} // 10 Seconds (60fps * 10)
        fps={60}
        width={1920} // 2K Resolution Width
        height={1080} // 2K Resolution Height
      />
    </>
  );
};