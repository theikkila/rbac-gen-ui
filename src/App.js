import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Switch from 'material-ui/Switch';

import rbac from './rbac.json'
import  './App.css'
import R from 'ramda'

const ResourceTable = (props) => {
  const resourceRows = R.values(R.mapObjIndexed((resource, resourceName) => {
    const verbs = R.map(verb => R.prop(verb, rbac.verbs), resource.allowed_verbs)
    //console.log(verbs)
    .map(verb => {
      return (
        <TableRow key={resourceName+verb.action}>
          <TableCell>Allow {verb.action} {verb.type === 'single' ? resource.name : resource.plural}</TableCell>
          <TableCell>{verb.read_only ? "Read" : "Mutating"}</TableCell>
          <TableCell>{verb.dangerous ? "Yes" : "No"}</TableCell>
          <TableCell>{verb.type}</TableCell>
          <TableCell>
            <Switch
              checked={true}
              onChange={e => {}}
              aria-label="checked"
            />
          </TableCell>
        </TableRow>
      )
    })
    return (
      <Card key={resourceName}>
        <CardContent>
          <Typography type="headline" component="h2">
            {resourceName}
          </Typography>
          <Typography component="p">
            {resource.description}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Privilege</TableCell>
                <TableCell>Mutating?</TableCell>
                <TableCell>Dangerous?</TableCell>
                <TableCell>Single/Multi</TableCell>
                <TableCell>Enable?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {verbs}
            </TableBody>
          </Table>
          </CardContent>
      </Card>)
  }, rbac.resources))
  return (
    <div>
        {resourceRows}
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <Grid container>
        <Grid item xs={8}>
          <Paper>
            <ResourceTable />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <pre>
              {JSON.stringify(rbac, null, 2)}
            </pre>
          </Paper>
        </Grid>
      </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
