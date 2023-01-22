export default function paragraph(roomSettings, roomDetails) {
    // checking first if the student has added own paragraph or not
  return roomSettings?.paragraph.length > 0
    ? roomSettings?.paragraph.split(" ")
    : roomDetails?.paragraphText.split(" ");
}
