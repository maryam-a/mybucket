// Check that the userId specified owns the docs
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
}