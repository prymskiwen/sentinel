import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import ShowMoreText from "react-show-more-text";
import {
  Alert as MuiAlert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider as MuiDivider,
  Grid,
  Slide,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { grey } from "@mui/material/colors";
import ShortTextIcon from "@mui/icons-material/ShortText";

import useAuth from "../../../../hooks/useAuth";
import CommentEditor from "../../../../components/commentEditor";
import { addSellerNote, getSellerNotes } from "../../../../services/MAPService";
import { convertDateToFormattedDateString } from "../../../../utils/functions";

const CommentText = styled.div`
  > p {
    padding: 0;
    margin: 0;
  }
`;
const CommentWrapper = styled.div`
  width: 100%;
  height: 320px;
  padding: 0 20px;
  overflow-y: scroll;
`;
const Divider = styled(MuiDivider)(spacing);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SellerNotesDlg = ({ open, selectedMAPData, handleClose }) => {
  const { user } = useAuth();
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [postingNotes, setPostingNotes] = useState(false);

  useEffect(() => {
    if (open && selectedMAPData !== null) {
      setLoadingNotes(true);
      getSellerNotes(selectedMAPData.sellerId).then((res) => {
        const {
          data: {
            body: { data: _notes },
          },
        } = res;

        setLoadingNotes(false);
        setNotes(_notes);
      });
    }
  }, [open, selectedMAPData]);

  const handleCommentPost = (newComment) => {
    const newNotes = [...notes];

    newNotes.push({
      user_email: user.email,
      comment: newComment,
      created_at: new Date(),
    });

    setPostingNotes(true);
    addSellerNote(selectedMAPData.sellerId, newComment).then((res) => {
      setPostingNotes(false);
      setNotes([...newNotes]);
    });
  };

  const handleAlertClose = () => {
    setPostingNotes(false);
  };

  const handleShowMoreClicked = (isExpanded) => {
    console.log(isExpanded);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        maxWidth="sm"
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="comment-dialog-description"
        fullWidth
        keepMounted
      >
        <DialogTitle>{selectedMAPData?.seller} Notes</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="comment-dialog-description"></DialogContentText>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <CommentEditor handleCommentPost={handleCommentPost} />
            </Grid>
            <Grid item xs={12}>
              <Divider>Notes</Divider>
            </Grid>
            <Grid item xs={12}>
              {!loadingNotes ? (
                notes.length ? (
                  <CommentWrapper>
                    <Grid container spacing={3}>
                      {[...notes].reverse().map((item, index) => (
                        <Grid key={index} item xs={12}>
                          <Grid
                            key={index}
                            container
                            justifyContent="space-between"
                          >
                            <Grid item xs={12}>
                              <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Tooltip
                                    title={item.user_email}
                                    placement="right-start"
                                  >
                                    <Grid
                                      container
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <Grid item>
                                        <ShortTextIcon
                                          fontSize="small"
                                          sx={{ pt: 1 }}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Typography
                                          component="span"
                                          variant="h6"
                                          sx={{ fontWeight: "bold" }}
                                        >
                                          {item.user_email.split("@")[0]}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Tooltip>
                                </Grid>
                                <Grid item>
                                  <Grid container justifyContent="flex-end">
                                    <Typography
                                      variant="caption"
                                      sx={{ color: grey[700] }}
                                    >
                                      {convertDateToFormattedDateString(
                                        new Date(item.created_at),
                                        false
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Box pl={4}>
                                <ShowMoreText
                                  lines={2}
                                  more="More"
                                  less="Less"
                                  onClick={handleShowMoreClicked}
                                  expanded={false}
                                  truncatedEndingComponent={"... "}
                                >
                                  <CommentText
                                    dangerouslySetInnerHTML={{
                                      __html: item.comment,
                                    }}
                                  />
                                </ShowMoreText>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </CommentWrapper>
                ) : (
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                      <Typography variant="h3" sx={{ color: grey[400] }}>
                        No notes yet
                      </Typography>
                    </Grid>
                  </Grid>
                )
              ) : (
                <Grid container justifyContent="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={postingNotes}
        onClose={handleAlertClose}
      >
        <Alert icon={<></>} onClose={handleAlertClose} severity="success">
          Posting your notes, please wait...
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default SellerNotesDlg;
