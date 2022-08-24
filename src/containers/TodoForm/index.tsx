import {
  Autocomplete,
  Box,
  createFilterOptions,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import _ from "lodash";
import { useEffect, useState } from "react";
import DialogComponent from "../../components/Dialog";
import { employeesData } from "../../ultils/MockupData";
import { DataItem, Employee } from "../TodoItem/model";

interface TodoFormContainerModel {
  open: boolean;
  data: DataItem;
  handleSubmit: (formData: DataItem) => void;
  handleClose: () => void;
}

interface validateModel {
  title?: string;
  dueDate?: string;
  assignedTo?: string;
}

const filter = createFilterOptions({
  stringify: (option: Employee) => `${option.name} ${option.email}`,
});

function TodoFormContainer(props: TodoFormContainerModel) {
  const { open, data, handleSubmit, handleClose } = props;
  const [options, setOptions] = useState<any>(employeesData);
  const [formData, setFormData] = useState<DataItem>(data);
  const [validate, setValidate] = useState<validateModel>();

  const onHandleChange = (name: string, value: string | null) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData(data);
    setValidate({});
  }, [data]);

  const onClickSubmit = () => {
    if (onHandleValidate()) {
      handleSubmit(formData);
    }
  };

  const onHandleValidate = () => {
    const validateTmp = { ...validate };

    if (_.isEmpty(formData.title)) {
      validateTmp.title = "Title is required";
    } else {
      delete validateTmp.title;
    }

    if (formData.dueDate == null) {
      validateTmp.dueDate = "Due date is required";
    } else if (formData.dueDate.toString() == "Invalid Date") {
      validateTmp.dueDate = "Invalid Date";
    } else {
      delete validateTmp.dueDate;
    }

    console.log("_.isEmpty(formData.assignedTo)", _.isEmpty(formData.assignedTo))
    if (_.isEmpty(formData.assignedTo)) {
      validateTmp.assignedTo = "Assigned to is required";
    } else {
      delete validateTmp.assignedTo;
    }

    if (_.isEmpty(validateTmp)) {
      return true;
    } else {
      setValidate(validateTmp);
      return false;
    }
  };

  return (
    <DialogComponent
      open={open}
      title={"Form"}
      handleSubmit={() => onClickSubmit()}
      handleClose={() => handleClose()}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Title"
          value={formData?.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onHandleChange("title", event.target.value)
          }
          helperText={validate?.title}
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          fullWidth
          id="outlined-required"
          multiline
          label="Description"
          value={formData?.shortDescription}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onHandleChange("shortDescription", event.target.value)
          }
          InputProps={{
            rows: 5,
          }}
          sx={{ margin: "10px 0px" }}
        />
        <FormControl fullWidth sx={{ margin: "10px 0px" }}>
          <Autocomplete
            fullWidth
            value={formData?.assignedTo}
            onChange={(event, newValue: any) => {
              if (typeof newValue === "string") {
                onHandleChange("assignedTo", newValue);
              } else if (newValue && newValue.inputValue) {
                setOptions([
                  ...options,
                  { name: newValue.inputValue, email: newValue.inputValue },
                ]);
                onHandleChange("assignedTo", newValue.inputValue);
              } else {
                onHandleChange("assignedTo", newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.email
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  name: `${inputValue}`,
                  email: `${inputValue}`,
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="assigned-to"
            options={options}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            renderOption={(props, option) => (
              <li {...props}>
                {" "}
                {option.name}, {option.email}
              </li>
            )}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Assigned To *" />
            )}
          />
          <FormHelperText>{validate?.assignedTo}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "10px 0px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date *"
              value={formData.dueDate}
              onChange={(value: any) => {
                onHandleChange("dueDate", value);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormHelperText>{validate?.dueDate}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "10px 0px" }}>
          <InputLabel id="demo-simple-select-label">Status *</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.status}
            label="Status *"
            onChange={(event: SelectChangeEvent) => {
              onHandleChange("status", event.target.value as string);
            }}
          >
            <MenuItem value={"1"}>Open</MenuItem>
            <MenuItem value={"0"}>Close</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </DialogComponent>
  );
}

export default TodoFormContainer;
