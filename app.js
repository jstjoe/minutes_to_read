(function() {

  return {
    events: {
      'app.activated':'minRead'
    },
    minRead: function() {
        
        var wordsPerMinute = this.setting('endUserSpeed'), // how fast most people can read on a monitor according to [Wikipedia](http://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension)
            currentComment = this.comment().text(), // the text of the current comment being entered
            words = currentComment.split(' '), // substring array of each word in the comment
            length = words.length, // size of the array
            time = length / wordsPerMinute, // how many minutes to read floating point integer
            minutes = Math.round(time), // how many minutes to read rounded up to nearest integer
            plural,
            string;
        if (minutes < 1) {
            string = 'less than a';
        } else if (minutes == 1) {
            string = minutes;
        } else {
            plural = true;
            string = minutes;
        }
        this.switchTo('moreThanMinute', {
            minReadRounded: string,
            plural: plural
        });
        var plural2,
            ticket = this.ticket(),
            ticketComments = ticket.comments(),
            ticketCommentsMap = _.map(ticketComments, function(comment){ return comment.value(); }), // array of substrings where each substring is an entire comment on the ticket
            ticketCommentsMapJoined = ticketCommentsMap.join(), // turn ticketCommentsMap into an entire string of all comments together
            ticketCommentsMapJoinedSplit = ticketCommentsMapJoined.split(' '), // turn ticketCommentsMapJoined into array of substrings, all words
            ticketCommentsMapJoinedSplitSize = ticketCommentsMapJoinedSplit.length, // number of substrings/words in ticketCommentsMapJoinedSplit
            test2 = ticketCommentsMapJoinedSplitSize / this.setting('agentSpeedDefault'), // how many minutes to read floating point integer
            minReadRoundedAll = Math.round(test2); // how many minutes to read rounded up to nearest integer
        if (minReadRoundedAll < 1) {
            string2 = 'less than a';
        } else if (minReadRoundedAll == 1) {
            string2 = minReadRoundedAll;
        } else {
            plural2 = true;
            string2 = minReadRoundedAll;
        }
        this.switchTo('moreThanMinute', {
            minReadRounded: string2,
            plural: plural
        });
        this.switchTo('moreThanMinute', {
            plural: plural,
            minReadRounded: string,
            minReadRoundedAll: string2,
            plural2: plural2
        });
    }
};
}());
