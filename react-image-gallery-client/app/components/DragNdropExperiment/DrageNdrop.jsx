// "use client";
// import React, { useState } from "react";
// import {
//   GridContextProvider,
//   GridDropZone,
//   GridItem,
//   move,
//   swap,
// } from "react-grid-dnd";

// function DragNdrop() {
//   const [items, setItems] = useState([
//     { id: 7, name: "george" },
//     { id: 8, name: "rupert" },
//     { id: 9, name: "alice" },
//     { id: 10, name: "katherine" },
//     { id: 11, name: "pam" },
//     { id: 12, name: "katie" },
//   ]);

//   function onChange(sourceId, sourceIndex, targetIndex, targetId) {
//     const nextState = swap(items, sourceIndex, targetIndex);
//     setItems(nextState);
//   }
//   return (
//     <GridContextProvider onChange={onChange}>
//       <GridDropZone
//         id="right"
//         boxesPerRow={4}
//         rowHeight={100}
//         style={{ height: "400px" }}
//         rows={2}
//         columns={2}
//       >
//         {items.map((item, index) => (
//           <GridItem key={item.id}>
//             <div className="flex-grow-2 w-full h-full bg-blue-300 border-[10px] border-white hover:cursor-move">
//               {item.name} {/* Display the 'name' property */}
//             </div>
//           </GridItem>
//         ))}
//       </GridDropZone>
//     </GridContextProvider>
//   );
// }

// export default DragNdrop;
