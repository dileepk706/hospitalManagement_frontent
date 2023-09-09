
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { AdsClick, Medication, Search } from '@mui/icons-material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(33, 57, 242) 0%,rgb(11, 245, 175) 50%,rgb(120, 32, 221) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(33, 57, 242) 0%,rgb(11, 245, 175) 50%,rgb(120, 32, 221) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(33, 242, 225) 0%, rgb(9, 69, 248) 50%, rgb(8, 149, 242) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(33, 242, 225) 0%, rgb(9, 69, 248) 50%, rgb(8, 149, 242) 100%)',
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <AdsClick />,
        2: <Search />,
        3: <Medication />,
        4: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ['Click Appointment button ', 'Tell what is your problem', 'Select a suitable doctor for you', 'Make an appointment'];

export default function ArticleSection() {
    return (


        <div className='flex flex-col w-full items-center justify-center gap-4 mb-[8%] mt-[6%] md:grid-cols-3'>
            <div className='col-span-1 flex flex-col w-full'>
                <h1 className='site-txt-color text-center font-bold text-xl my-6  font-mono  md:mb-[35px]   md:text-2xl'>How to take an Apointment</h1>

                <div>

                    <Stack sx={{ width: '100%' }} spacing={4}>

                        <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>



                    </Stack>
                </div>
                {/* <p className='text-sm hidden font-mono text-gray-500 text-start md:text-sm md:block'>Health articles that keep you informed about good health practices and achieve your goals.</p> */}
            </div>





        </div>
    );
}
