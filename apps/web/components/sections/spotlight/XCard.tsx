//
//
// import {TWEETS} from "@/lib/home/TweetsData";
// import {motion, useScroll, useSpring, useTransform} from "framer-motion";
// import TweetCard from "@/components/mvpblocks/twittercard";
// import {useRef} from "react";
//
//
//
//
// export const XCard = () => {
//
//     const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
//     const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
//     const smoothXLeft = useSpring(xLeft, { stiffness: 50, damping: 20 });
//     const smoothXRight = useSpring(xRight, { stiffness: 50, damping: 20 });
//     const containerRef = useRef<HTMLElement>(null);
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start end", "end start"]
//     });
//
//
//     return (
//         <>
//             <div className="flex-1 w-full max-w-xl relative py-20">
//                 <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
//                 <div className="flex flex-col gap-12">
//                     {TWEETS.map((tweet, i) => (
//                         <motion.div
//                             key={i}
//                             style={{ x: i === 0 ? smoothXLeft : smoothXRight }}
//                             initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
//                             whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                             viewport={{ once: false, margin: "-50px" }}
//                             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//                             className="group relative"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10" />
//                             <TweetCard {...tweet} />
//                         </motion.div>


//                     ))}
//                 </div>
//             </div>
//
//         </>
//     );
// };
