// // import { useSignalState, Signal } from "reactive-kit/react";

// // signal: Signal<{
// //   count_1: number;
// //   count2: Set<number>;
// //   test3: {
// //     test4: number[];
// //     test5: number[];
// //     test6: Set<number>;
// //   };
// // }>;

// function HomeTest({
//   signal,
// }: {
//   signal: Signal<{
//     test4: number[];
//     test5: number[];
//     test6: Set<number>;
//     test7: Map<number, number>;
//   }>;
// }) {
//   const test = useSignalState(signal);

//   return (
//     <div
//       onClick={() => {
//         signal.value.test5.push(Math.random());
//       }}
//     >
//       HomeTest hihih {test.test5.length}
//       {test.test6.size}
//     </div>
//   );
// }

// export { HomeTest };
