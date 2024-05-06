import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { FormControl, Grid, Typography } from "@mui/material";

const FileAttachment = ({ onFileChange }) => {
  const [attachments, setAttachments] = useState([{ id: 1, name: "file1" }]);

  const handleAddAttachment = () => {
    const newAttachment = {
      id: attachments.length + 1,
      name: `file${attachments.length + 1}`,
    };
    setAttachments([...attachments, newAttachment]);
  };

  const handleDeleteAttachment = (id) => {
    const updatedAttachments = attachments.filter(
      (attachment) => attachment.id !== id
    );
    setAttachments(updatedAttachments);
    
    onFileChange(updatedAttachments.map((attachment) => attachment.file));
  };

  const handleFileChange = (event, id) => {
    const updatedAttachments = attachments.map((attachment) =>
      attachment.id === id
        ? { ...attachment, file: event.target.files[0] }
        : attachment
    );
    setAttachments(updatedAttachments);
    
    onFileChange(updatedAttachments.map((attachment) => attachment.file));
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        onClick={handleAddAttachment}
        startIcon={<AddIcon />}
        color="success"
        // style={{ marginBottom: "10px" }}
      >
        Add More
      </Button>

      {attachments.map((attachment, index) => (
        <Grid container key={attachment.id} style={{ marginBottom: "10px" }}>
          <Grid item xs={11}>
            <Typography variant="subtitle1">
              Attach complaint documents - {attachment.id} (if any)
            </Typography>
          </Grid>

          <Grid item xs={1} style={{ textAlign: "right" }}>
            {index > 0 && (
              <IconButton
                onClick={() => handleDeleteAttachment(attachment.id)}
                style={{ marginLeft: "auto" }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
              
                type="file"
                id={attachment.name}
                name={attachment.name}
                onChange={(event) => handleFileChange(event, attachment.id)}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default FileAttachment;
