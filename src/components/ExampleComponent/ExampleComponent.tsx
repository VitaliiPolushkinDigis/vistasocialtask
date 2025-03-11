import React from "react";
import { IDropdownItem } from "../MultiLevelDropdown/DropdownItem/DropdownItem";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";
import { Circles } from "../icons/circles";
import { CameraIcon } from "../icons/camera";
import { VideoIcon } from "../icons/video";

export const ExampleComponent: React.FC = () => {
  const items: IDropdownItem[] = [
    {
      id: "1",
      label: "Add Image",
      icon: <CameraIcon />,
      children: [
        {
          id: "1.1",
          label: "Upload from Computer",
          icon: <CameraIcon />,
          children: [
            {
              id: "1.1.1",
              label: "Upload from Computer 1.1.1",
              icon: <CameraIcon />,
            },
            {
              id: "1.1.2",
              label: "Upload from Computer 1.1.2",
              icon: <CameraIcon />,
            },
          ],
        },
        {
          id: "1.2",
          label: "Upload from URL",
          icon: <CameraIcon />,
          children: [
            {
              id: "1.2.1",
              label: "Upload from URL 1.2.1",
              icon: <CameraIcon />,
              children: [
                {
                  id: "1.2.1.1",
                  label: "Upload from URL 1.2.1.1",
                  icon: <CameraIcon />,
                },
              ],
            },
          ],
        },
        {
          id: "1.3",
          label: "Save",
          icon: <CameraIcon />,
        },
      ],
    },
    {
      id: "2",
      label: "Add Video",
      icon: <VideoIcon />,
      children: [
        {
          id: "2.1",
          label: "Cut",
          icon: <CameraIcon />,
        },
        {
          id: "2.2",
          label: "Copy",
          icon: <CameraIcon />,
        },
        {
          id: "2.3",
          label: "Paste",
          icon: <CameraIcon />,
        },
      ],
    },
    {
      id: "3",
      label: "Help",
      icon: <CameraIcon />,
    },
  ];
  return (
    <div>
      <h3>Example</h3>
      <div style={{ padding: "20px" }}>
        <h2>Dropdown Demo</h2>

        <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
          <MultiLevelDropdown
            component={
              <div
                style={{
                  padding: "0px 0.444444rem",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                }}
              >
                <Circles />
              </div>
            }
            items={items}
          />
          <MultiLevelDropdown component={<p>Paragraph</p>} items={items} />
          <MultiLevelDropdown
            component={<button>Left Dropdown</button>}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};
