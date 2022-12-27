import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = handleSubmit(async (item: any) => {
    const data = {
      email: item.email,
      yesorno: item.yesorno,
      first: item.first ? "Y" : "N",
      secound: item.secound ? "Y" : "N",
      third: item.third ? "Y" : "N",
      content: item.content || "",
    };

    await axios
      .post(
        "https://sheet.best/api/sheets/5869f7bc-8ec2-4ba1-9bc1-fd7b691ba023",
        data
      )
      .then((response) => {
        console.log(response);
        reset();
      });
  });

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        size="small"
        label="이메일 *"
        placeholder="이메일 주소를 입력해 주세요."
        {...register("email")}
      />

      <Controller
        name="yesorno"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel
              value="Y"
              control={<Radio />}
              label={<Box>예</Box>}
            />
            <FormControlLabel
              value="N"
              control={<Radio />}
              label={<Box>아니요</Box>}
            />
          </RadioGroup>
        )}
      />

      <FormControlLabel
        {...register("first")}
        control={<Checkbox />}
        label={<Box>첫번째 선택지</Box>}
      />

      <FormControlLabel
        {...register("secound")}
        control={<Checkbox />}
        label={<Box>두번째 선택지</Box>}
      />

      <FormControlLabel
        {...register("third")}
        control={<Checkbox />}
        label={<Box>세번째 선택지</Box>}
      />

      <Box>
        <TextField size="small" label="기타사항" {...register("content")} />
      </Box>

      <Box>
        <Button color="primary" type="submit">
          전송
        </Button>
      </Box>
    </Box>
  );
}

export default App;
