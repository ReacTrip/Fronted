import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const initialNewTripState = {
  title: "",
  startDate: new Date(), // Date 객체로 초기화
  endDate: new Date(),   // Date 객체로 초기화
  image: null,
};

const TripDialog = ({ open, onClose, onAddTrip, newTrip, setNewTrip }) => {
  // DateRange 선택 변경 처리
  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setNewTrip({
      ...newTrip,
      startDate: startDate instanceof Date ? startDate : new Date(startDate),
      endDate: endDate instanceof Date ? endDate : new Date(endDate),
    });
  };

  const handleAdd = () => {
    onAddTrip();
    setNewTrip(initialNewTripState); // 상태 초기화
    onClose();
  };

  const handleClose = () => {
    setNewTrip(initialNewTripState); // 상태 초기화
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>나만의 여행 만들기</DialogTitle>

      {newTrip.image && (
        <img
          src={URL.createObjectURL(newTrip.image)}
          alt="대표 이미지"
          style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginBottom: "16px" }}
        />
      )}

      <Button variant="outlined" component="label" sx={{ mt: 2, mx: "auto", display: "block" }}>
        대표 이미지 업로드
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setNewTrip({ ...newTrip, image: e.target.files[0] })}
        />
      </Button>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          title="title"
          label="여행 제목"
          type="text"
          fullWidth
          variant="standard"
          value={newTrip.title}
          onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
        />

        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "left" }}>
          여행 일자 선택
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mt: 1 }}>
          <DateRange
            ranges={[
              {
                startDate: newTrip.startDate,
                endDate: newTrip.endDate,
                key: "selection",
              },
            ]}
            onChange={handleDateChange}
            rangeColors={["#3f51b5"]}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          취소
        </Button>
        <Button onClick={handleAdd} color="primary">
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TripDialog;