import {
  Container,
  FormControl,
  FormLabel,
  List,
  Checkbox,
  ListItem,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Chip,
  Stack,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FormEvent, SyntheticEvent, useState } from "react";

interface CheckedType {
  [key: string]: boolean;
}
const TodoList = () => {
  const [input, setInput] = useState<string[]>([]);
  const [check, setCheck] = useState<CheckedType>({});

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    const eventTarget = event.target as HTMLInputElement;
    setCheck((prevState) => ({
      ...prevState,
      [eventTarget.name]: checked,
    }));
  };
  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const eventTarget = event.target as HTMLFormElement;
    const value = eventTarget[0] as HTMLInputElement;
    setInput((prevState) => [...prevState, value.value]);
  };
  const handleDelete = (value: string) => {
    const newInput = input.filter((elem) => elem !== value);
    setInput(newInput);
  };
  return (
    <>
      <Container maxWidth="md">
        <Typography sx={{ textAlign: "center", margin: "0 auto" }} variant="h1">
          Todos
        </Typography>
        <form onSubmit={handleSumbit}>
          <FormControl
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "30px",
            }}
          >
            <TextField
              sx={{ width: "60%" }}
              id="outlined-basic"
              label="Todo"
              variant="outlined"
            />
            <Button type="submit" variant="contained">
              Add todo
            </Button>
          </FormControl>
        </form>

        <FormControl sx={{ width: "100%", textAlign: "center" }}>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ fontSize: "32px" }}
          >
            What needs to be done
          </FormLabel>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            component="nav"
            aria-label="mailbox folders"
          >
            {input &&
              input.map((item, index) => (
                <ListItem
                  key={index}
                  divider
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={item}
                    onChange={handleChange}
                    name={item}
                  />
                  <Stack
                    sx={{ alignItems: "center" }}
                    direction="row"
                    spacing={1}
                  >
                    {" "}
                    {check && check[item] && (
                      <Chip size="small" label="completed" color="success" />
                    )}
                    <Button onClick={() => handleDelete(item)} color="error">
                      <DeleteForeverIcon />
                    </Button>
                  </Stack>
                </ListItem>
              ))}
          </List>
        </FormControl>
      </Container>
    </>
  );
};

export default TodoList;
