import React, { useRef, useState } from "react";
import { DropdownItem, IDropdownItem } from "./DropdownItem/DropdownItem";
import styles from "./MultyLevelDropdown.module.css";

interface MultiLevelDropdownProps {
  component: React.ReactNode;
  items: IDropdownItem[];
  className?: string;
  hideDelay?: number;
}

const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = ({
  component,
  items,
  className = "",
  hideDelay = 400,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeItemsByLevel, setActiveItemsByLevel] = useState<
    Record<number, string>
  >({}); // {0:'1', 1: '1.1', '2': '1.2.1'}

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveItemsByLevel({});
      hideTimeoutRef.current = null;
    }, hideDelay);
  };

  const handleItemActive = (level: number, id: string) => {
    console.log("activeItemsByLevel", activeItemsByLevel);

    setActiveItemsByLevel((prev) => {
      const previousActiveItems = Object.entries(prev).filter(
        ([parentLevel, _]) => Number(parentLevel) < level
      );

      console.log("previousActiveItems", previousActiveItems);

      // If we have an id, add it to the result
      return id
        ? Object.fromEntries([...previousActiveItems, [level, id]])
        : Object.fromEntries([...previousActiveItems]);
    });
  };
  console.log("FINAL: ", activeItemsByLevel);

  return (
    <div
      className={`${styles.dropdown} ${className}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className={styles.component}>{component}</div>
      <ul className={`${styles.dropdownMenu} ${isOpen ? styles.open : ""}`}>
        {items.map((item) => (
          <DropdownItem
            key={item.id}
            item={item}
            hideDelay={hideDelay}
            level={0}
            activeItemsByLevel={activeItemsByLevel}
            onItemActive={handleItemActive}
          />
        ))}
      </ul>
    </div>
  );
};

export default MultiLevelDropdown;
