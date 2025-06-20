import React from "react";
import { cn } from "../../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

type DockItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [showMore, setShowMore] = useState(false);
  const remainingItems = items.slice(5);

  return (
    <div className={cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-50 block md:hidden", className)}>
      <motion.div
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-50/30 backdrop-blur-sm dark:bg-neutral-900/30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {items.slice(0, 5).map((item, idx) => (
          item.href ? (
            <motion.a
              key={item.title}
              href={item.href}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200/50 backdrop-blur-sm dark:bg-neutral-800/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-5 w-5">{item.icon}</div>
            </motion.a>
          ) : (
            <motion.button
              key={item.title}
              onClick={item.onClick}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200/50 backdrop-blur-sm dark:bg-neutral-800/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-5 w-5">{item.icon}</div>
            </motion.button>
          )
        ))}
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200/50 backdrop-blur-sm dark:bg-neutral-800/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMore(!showMore)}
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        </motion.button>
      </motion.div>

      {/* More Menu */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-xl bg-gray-50/30 backdrop-blur-sm dark:bg-neutral-900/30"
          >
            <div className="flex flex-col gap-2">
              {remainingItems.map((item) => (
                item.href ? (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200/50 backdrop-blur-sm dark:bg-neutral-800/50 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-5 w-5">{item.icon}</div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.title}</span>
                  </motion.a>
                ) : (
                  <motion.button
                    key={item.title}
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200/50 backdrop-blur-sm dark:bg-neutral-800/50 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-5 w-5">{item.icon}</div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.title}</span>
                  </motion.button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50/30 backdrop-blur-sm px-4 pb-3 md:flex dark:bg-neutral-900/30",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const Container = href ? 'a' : 'button';
  const containerProps = href ? { href } : { onClick };

  return (
    <Container {...containerProps}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200/50 backdrop-blur-sm dark:bg-neutral-800/50"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -2, x: "-50%" }}
              className="absolute top-full mt-2 left-1/2 w-fit rounded-md border border-gray-200/50 bg-gray-100/50 backdrop-blur-sm px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900/50 dark:bg-neutral-800/50 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Container>
  );
} 