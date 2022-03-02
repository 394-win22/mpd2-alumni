import { Card, Button, IconButton, Typography, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

const expertises = [
  "Marketing",
  "Industrial Design",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Software Development",
  "Product Owner",
  "UI/UX Design",
  "Finance",
  "Graphic Design",
  "Project Management",
];
const currentPhases = [
  "Ethnography",
  "Market Research",
  "Brainstorming",
  "Idea Convergence",
  "Prototyping",
  "Engineering/Design",
  "Materials Selection",
  "Business Modeling",
  "Story/Presentation",
];
const SearchDropdown = ({
  isDropped,
  setIsDropped,
  setExpertiseFilter,
  expertiseFilter,
}) => {
  return (
    <>
      {isDropped && (
        <Card
          sx={{ my: 0, py: 1 }}
          style={{
            width: "100%",
            zIndex: 10,
            height: "100%",
            textAlign: "left",
            borderTop: "1px solid rgba(0, 0, 0, 0.6)",
          }}
        >
          <IconButton
            sx={{
              position: "relative",
              right: 0,
              top: 0,
              float: "right",
            }}
            onClick={() => setIsDropped(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h7" sx={{ left: 0, p: 2 }}>
            {" "}
            Search By <span style={{ fontWeight: "bold" }}>Expertise</span>
          </Typography>
          <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap" }}>
            {expertises.map((expertise, i) => {
              return (
                <Chip
                  key={i}
                  style={{
                    backgroundColor: expertiseFilter.includes(expertise) && "#f1b844",
                  }}
                  label={expertise}
                  sx={{ mx: 1, my: 0.5 }}
                  onClick={() => {
                    expertiseFilter.includes(expertise)
                      ? setExpertiseFilter(expertiseFilter.filter((p) => p !== expertise))
                      : setExpertiseFilter([...expertiseFilter, expertise]);
                  }}
                />
              )
            })}
          </Box>
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;