import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material';
import basketball from '../assets/images/basketball.jpg';
import cycling from '../assets/images/cycling.jpg';
import yoga from '../assets/images/yoga.jpg';
import meeting from '../assets/images/meeting.jpg';

export default function Events() {
  return (
    <div>
      <Typography variant="h3" sx={{ marginBottom: 2, marginLeft: '50px' }}>
        Events
      </Typography>
    <div style={{ marginLeft: '135px' }}>
    <Grid container spacing={2}>
      <Card sx={{ maxWidth: 450, margin: 2, backgroundColor: 'lightgray' }}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            sx={{ height: 150 }}
            component="img"
            image={basketball}
            alt="basketball"
            title="basket ball"
          />
          <Typography variant="h5" component="div" sx={{ position: 'absolute', bottom: 0, left: 16, color: 'white' }}>
            BASKETBALL
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            &emsp; <strong style={{color: 'green'}}>2</strong><strong> UPCOMING</strong>
            <br />
            <br />
            Lorem Ipsum
            <br />
            <small><em>"Amet porttitor eget dolor morbi non arcu risus facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat."</em></small>
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 450, margin: 2, backgroundColor: 'lightgray' }}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            sx={{ height: 150 }}
            component="img"
            image={cycling}
            alt="cycling"
            title="cycling"
          />
          <Typography variant="h5" component="div" sx={{ position: 'absolute', bottom: 0, left: 16, color: 'white' }}>
            CYCLING
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            &emsp; <strong style={{color: 'green'}}>2</strong><strong> UPCOMING</strong>
            <br />
            <br />
            Lorem Ipsum
            <br />
            <small><em>"Cras semper auctor neque vitae. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum."</em></small>
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 450, margin: 2, backgroundColor: 'lightgray' }}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            sx={{ height: 150 }}
            component="img"
            image={yoga}
            alt="yoga"
            title="yoga"
          />
          <Typography variant="h5" component="div" sx={{ position: 'absolute', bottom: 0, left: 16, color: 'white' }}>
            YOGA
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            &emsp; <strong style={{color: 'red'}}>1</strong><strong> UPCOMING</strong>
            <br />
            <br />
            Lorem Ipsum
            <br />
            <small><em>"Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ut tortor pretium viverra suspendisse."</em></small>
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 450, margin: 2, backgroundColor: 'lightgray' }}>
        <div style={{ position: 'relative' }}>
          <CardMedia
            sx={{ height: 150 }}
            component="img"
            image={meeting}
            alt="meeting"
            title="meeting"
          />
          <Typography variant="h5" component="div" sx={{ position: 'absolute', bottom: 0, left: 16, color: 'white' }}>
            MEETING
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            &emsp; <strong style={{color: 'red'}}>1</strong><strong> UPCOMING</strong>
            <br />
            <br />
            Lorem Ipsum
            <br />
            <small><em>"Tempus imperdiet nulla malesuada pellentesque elit eget gravida. Diam sit amet nisl suscipit adipiscing bibendum est."</em></small>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
      </div>
    </div>
  );
}