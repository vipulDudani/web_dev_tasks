import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
// import "../styles/loading.css";

// function Loading() {
//   const dark = useSelector((state) => state.auth.darkMode);

//   return (
//     <div className="lds-ring">
//       <div></div>
//       <div></div>
//       <div></div>
//       <div></div>
//     </div>
//   );
// }

export default function Loading() {
  const dark = useSelector((state) => state.auth.darkMode);
  return (
    <div className="m-[2%]  flex justify-between gap-5">
      <div className="w-[20%]">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={300}
          height={450}
        />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={510}
          // className="w-[20%]"
          height={118}
        />
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={210}
          height={550}
        />
      </div>
      <div className="w-[20%]">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={300}
          height={450}
        />
      </div>
    </div>
  );
}

export const PostLoading = () => {
  const dark = useSelector((state) => state.auth.darkMode);

  return (
    <>
      <div className="flex gap-4 w-full items-center">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE" }}
          variant="circular"
          width={60}
          height={60}
        />
        <div className="flex flex-col gap-2">
          <Skeleton
            sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE" }}
            variant="text"
            height={15}
            width={120}
          >
            {" "}
          </Skeleton>
          <Skeleton
            variant="text"
            sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE" }}
            height={10}
            width={70}
          />
        </div>
      </div>
      <Skeleton
        sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE" }}
        variant="rounded"
        // width={60}
        height={450}
      />
    </>
  );
};
