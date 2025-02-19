import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Avatar,
  } from '@mui/material';

const AuctionDetails = () => {
    console.log("Inside Auction details Page");
    
    const location = useLocation();
    const navigate = useNavigate();
    const auctionData = location.state?.auctionData || null;

    if(auctionData == null){
        console.log("Invalid Auction ID is given or No data present for the given auction");
        Swal.fire({
            title : 'No Data Available',
            text : "No data available for the selected auction",
            showConfirmButton : true,
            confirmButtonText : "Go Back"
        }).then((result)=>{
            navigate(-1);
        });
    }

    console.log("Location -> ", location);
    console.log("Auction Data is : ",auctionData);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
      };
    
      return (
        <div className="w-full h-full m-auto px-[300px] py-8">
          {/* Basic Details Section */}
          <Card sx={{ marginBottom: '24px' }}>
            <CardHeader
              title={<Typography variant="h5">Basic Details</Typography>}
              className="text-left"
            />
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Auction ID</Typography>
                      </TableCell>
                      <TableCell>{auctionData.auctionId}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Auction Title</Typography>
                      </TableCell>
                      <TableCell>{auctionData.auctionTitle}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Start Date</Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(auctionData.auctionStartDate)}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">End Date</Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(auctionData.auctionEndDate)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Publish Date</Typography>
                      </TableCell>
                      <TableCell>
                        {formatDate(auctionData.auctionPublishDate)}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Status</Typography>
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {auctionData.auctionStatus}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Type</Typography>
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {auctionData.auctionType}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Description</Typography>
                      </TableCell>
                      <TableCell>{auctionData.auctionDescription}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
    
          {/* Lot Details Section */}
          <Card>
            <CardHeader
              title={<Typography variant="h5">Lot Details</Typography>}
              className="text-left"
            />
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Lot Number</TableCell>
                      <TableCell>Images</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>EMD</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auctionData.itemDetails.map((lot, index) => (
                      <TableRow key={index}>
                        <TableCell className="">{ index + 1}</TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            {lot.images.map((img, imgIndex) => (
                              <Grid item key={imgIndex}>
                                <Avatar
                                  variant="rounded"
                                  src={img}
                                  alt={`Lot ${index + 1} - Image ${imgIndex + 1}`}
                                  sx={{ width: 64, height: 64 }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </TableCell>
                        <TableCell>{lot.lotDescription}</TableCell>
                        <TableCell>{`${lot.city}, ${lot.state}`}</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>
                          {lot.prodCategory}
                        </TableCell>
                        <TableCell>{lot.weight}</TableCell>
                        <TableCell>{lot.emd}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      );
    };

export default AuctionDetails;