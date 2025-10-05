// export default function Pagination() {
//   return (
//     <div className="w-full mb-3 mt-10 flex justify-center items-center gap-5 ltr">
//       {/* دکمه قبلی */}
//       <button
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`${
//           currentPage === 1
//             ? "opacity-50 cursor-not-allowed"
//             : "hover:text(--color-Gray)"
//         } rounded`}
//       >
//         <ChevronLeft className="w-6 h-6 text(--color-Gray)" />
//       </button>

//       {/* شماره صفحات */}
//       {Array.from({ length: pageCount }).map((_, index) => (
//         <span
//           key={index}
//           className={`rounded cursor-pointer ${
//             currentPage === index + 1
//               ? "text-(--color--Blue-700) font-bold"
//               : "text-(--color-Gray)"
//           }`}
//           onClick={() => handlePageChange(index + 1)}
//         >
//           {index + 1}
//         </span>
//       ))}

//       {/* دکمه بعدی */}
//       <button
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === pageCount}
//         className={`${
//           currentPage === pageCount
//             ? "opacity-50 cursor-not-allowed"
//             : "hover:text-(--color-Gray)"
//         } rounded`}
//       >
//         <ChevronRight className="w-6 h-6 text(--color-Gray)" />
//       </button>
//     </div>
//   );
// }
