import styled from 'styled-components'
import { HiArrowUpOnSquare } from 'react-icons/hi2'
import ButtonText from '../../ui/ButtonText'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'
import Tag from '../../ui/Tag'
import { useBooking } from './useBooking'
import { useMoveBack } from '../../hooks/useMoveBack'
import Spinner from '../../ui/Spinner'

import BookingDataBox from './BookingDataBox'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useDeleteBooking } from './useDeleteBooking'
import Modal from '../../ui/Modal'
import { useCheckout } from '../check-in-out/useCheckout'

import ConfirmDelete from '../../ui/ConfirmDelete'
import Empty from '../../ui/Empty'

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`

function BookingDetail() {
    const { booking, isLoading } = useBooking()
    const { checkout, isCheckingOut } = useCheckout()
    const { deleteBooking, isDeleting } = useDeleteBooking()

    const moveBack = useMoveBack()
    const navigate = useNavigate()

    if (isLoading) return <Spinner />
    if (!booking) return <Empty resource="booking" />
    const { status, id: bookingId } = booking
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    }

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading type="h1">Bookings {bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>
            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === 'unconfirmed' && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}

                {status === 'checked-in' && (
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button variation="danger">Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isDeleting}
                            onConfirm={() =>
                                deleteBooking(bookingId, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                        />
                    </Modal.Window>
                </Modal>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    )
}

export default BookingDetail
