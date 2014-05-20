(function() {

  return {
    events: {
      'app.activated':'minRead'
    },

    minRead: function() {
        var wordsPerMinute = 180; // how fast most people can read on a monitor according to [Wikipedia](http://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension)
        var comment = this.comment().text(); // the text of the current comment being entered
        var CommentArray = comment.split(' '); // substring array of each word in the comment
        var CommentArraySize = CommentArray.length; // size of the array
        var test = CommentArraySize / wordsPerMinute; // how many minutes to read floating point integer
        var minReadRounded = Math.round(test); // how many minutes to read rounded up to nearest integer
        var plural;
        var minutes;
        if (minReadRounded < 1) {
            minutes = 'less than a';
        } else if (minReadRounded == 1) {
            minutes = minReadRounded;
        } else {
            plural = true;
            minutes = minReadRounded;
        }
        this.switchTo('moreThanMinute', {
            minReadRounded: minutes,
            plural: plural
        });

        var ticket = this.ticket();
        var ticketComments = ticket.comments();
        var ticketCommentsMap = _.map(ticketComments, function(comment){ return comment.value(); }); // array of substrings where each substring is an entire comment on the ticket
        var ticketCommentsMapJoined = ticketCommentsMap.join(); // turn ticketCommentsMap into an entire string of all comments together
        var ticketCommentsMapJoinedSplit = ticketCommentsMapJoined.split(' '); // turn ticketCommentsMapJoined into array of substrings, all words
        var ticketCommentsMapJoinedSplitSize = ticketCommentsMapJoinedSplit.length; // number of substrings/words in ticketCommentsMapJoinedSplit
        var test2 = ticketCommentsMapJoinedSplitSize / this.setting('wordsPerMinutedefault'); // how many minutes to read floating point integer
        var minReadRoundedAll = Math.round(test2); // how many minutes to read rounded up to nearest integer
        this.switchTo('moreThanMinute', {
            minReadRoundedAll: minReadRoundedAll,
            plural: plural,
            minReadRounded: minutes
        });
    }
};
}());
