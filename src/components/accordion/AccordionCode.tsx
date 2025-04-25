import React, { FC } from 'react';
import {
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Accordion as MuiAccordion,
  AccordionSummaryProps,
  AccordionProps,
  styled,
} from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {},
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  paddingLeft: 10,
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({}));

/**
 * @author
 * @function @AccordionCode
 **/

export const AccordionCode: FC = () => {
  // const [expanded, setExpanded] = useState<string | false>('');

  // If you are using mapping
  return (
    <Accordion
    // key={idx}
    // expanded={expanded === `Accordion-${idx}`}
    // onChange={handleChange(`Accordion-${idx}`)}
    // className={`${
    //   expanded === `Accordion-${idx}`
    //     ? 'bg-[#ffffff10]'
    //     : 'bg-transparent hover:bg-[#ffffff09]'
    // } text-white items-center justify-center relative rounded-lg`}
    >
      <AccordionSummary
      // aria-controls={`Accordion-${idx}-header-content`}
      // id={`Accordion-${idx}-header`}
      ></AccordionSummary>
      <AccordionDetails
      // aria-controls={`Accordion-${idx}-detail-content`}
      // id={`Accordion-${idx}-content`}
      ></AccordionDetails>
    </Accordion>
  );
};
