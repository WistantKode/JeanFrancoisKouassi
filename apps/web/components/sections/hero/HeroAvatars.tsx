import { AvatarTooltip } from '@/components/shared/ui-blocks/avatar-tooltip';
import { LANDING_CONTENT } from '@/config/landing';
import { SupporterCounter } from './SupporterCounter';

export const HeroAvatars: FC = () => {
  const { avatars, social } = LANDING_CONTENT.hero;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center"> 
         <AvatarTooltip items={avatars} />
      </div>
      
      <div className="flex flex-col items-center sm:items-start bg-background/40 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl shadow-primary/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-bold text-foreground">
             <SupporterCounter target={social.supporters} />+
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/80 leading-none mt-1">
          {social.text}
        </p>
      </div>
    </div>
  );
};
