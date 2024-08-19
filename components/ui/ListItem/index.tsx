import { AnimatePresence, motion } from "framer-motion";

const ListItem = ({ ...props }: { [key: string]: any }) => {
  return (
    <>
      <motion.li
        key={props.index}
        onClick={() => props.setSelectedId(props.index)}
        className="flex items-center justify-between px-4 py-2 m-2 rounded-xl text-palette-white bg-palette-green shadow-xl hover:bg-palette-blue cursor-pointer hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-center">
          <img
            src={props.doctor.profilePicture}
            alt={`Dr. ${props.doctor.fullName.firstName} ${props.doctor.fullName.lastName}`}
            className="w-12 h-12 rounded-full mr-3"
          />
          <span>
            Dr. {props.doctor.fullName.firstName}{" "}
            {props.doctor.fullName.lastName}
          </span>
        </div>
        <span>{props.doctor.specialisation.field}</span>
      </motion.li>
    </>
  );
};

export default ListItem;
