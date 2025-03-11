import React from "react";
import styles from "../MultyLevelDropdown.module.css";
import { ChevronRight } from "../../icons/chevron-right";

export interface IDropdownItem {
  id: string;
  label: React.ReactNode;
  onClick?: () => void;
  children?: IDropdownItem[];
  icon?: React.ReactNode;
}

interface IDropdownItemProps {
  item: IDropdownItem;
  hideDelay?: number;
  level?: number;
  activeItemsByLevel?: Record<number, string>;
  onItemActive?: (level: number, id: string) => void;
  parentDirection?: "left" | "right";
}

export const DropdownItem: React.FC<IDropdownItemProps> = ({
  item,
  hideDelay = 400,
  level = 0,
  activeItemsByLevel = {},
  onItemActive,
  parentDirection,
}) => {
  const { label, onClick, icon, children } = item;
  const [submenuDirection, setSubmenuDirection] = React.useState<
    "left" | "right"
  >(parentDirection || "right");
  const itemRef = React.useRef<HTMLLIElement>(null);
  const hasChildren = children?.length;

  const isActive = activeItemsByLevel[level] === item.id;

  const checkDirection = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      const spaceOnLeft = rect.left;
      const requiredSpace = 200;

      //check only right space
      if (!parentDirection) {
        if (spaceOnRight < requiredSpace) {
          setSubmenuDirection("left");
        } else {
          setSubmenuDirection("right");
        }
      }
      // For nested levels, check both sides and use the side with more space
      else {
        if (spaceOnRight >= requiredSpace) {
          setSubmenuDirection("right");
        } else if (spaceOnLeft >= requiredSpace) {
          setSubmenuDirection("left");
        } else {
          // If neither side has enough space, use the side with more space
          setSubmenuDirection(spaceOnRight > spaceOnLeft ? "right" : "left");
        }
      }
    }
  };

  const handleMouseEnter = () => {
    if (hasChildren) {
      checkDirection();
      onItemActive?.(level, item.id);
    } else {
      onItemActive?.(level, "");
    }
  };

  return (
    <li
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      className={styles.dropdownItem}
      onClick={onClick}
    >
      <div className={styles.dropdownItemInfo}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{label}</span>
      </div>
      {hasChildren && <span className={styles.icon}>{<ChevronRight />}</span>}
      {hasChildren && (
        <ul
          className={`${styles.dropdownMenu} ${styles.submenu} ${
            styles[submenuDirection]
          } ${isActive ? styles.open : ""}`}
        >
          {item.children?.map((subItem) => (
            <DropdownItem
              key={subItem.id}
              item={subItem}
              hideDelay={hideDelay}
              level={level + 1}
              activeItemsByLevel={activeItemsByLevel}
              onItemActive={onItemActive}
              parentDirection={submenuDirection}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
