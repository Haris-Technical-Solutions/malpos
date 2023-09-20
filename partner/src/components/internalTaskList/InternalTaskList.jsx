import Box from "../elements/Box";
import CardHeader from "../cards/CardHeader";
import InternalTasksTable from "./InternalTasksTable";

const InternalTaskList = ({title, dotsMenu, thead, tbody, table}) => {
  return (
    <Box className="mc-card">
      <CardHeader title={title}/>
      <InternalTasksTable thead={table.thead} tbody={table.tbody} />
    </Box>
  );
};

export default InternalTaskList;
