import { type FC } from 'react';
import { WaitlistSection as CleanWaitlistSection } from './waitlist/WaitlistSection';

// Wrapper to expose the section to external consumers
export const Waitlist: FC = () => {
    return <CleanWaitlistSection />;
};
