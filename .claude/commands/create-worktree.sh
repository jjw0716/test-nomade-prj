#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Error: Worktree 이름을 명시해주세요!"
  return 1
fi

ARGUMENT=$1

# 폴더 이름
WORKTREE_PATH="./$ARGUMENT"

# Create the worktree, and if successful, change directory
if git worktree add "$WORKTREE_PATH"; then
  echo "Worktree 생성 성공: $WORKTREE_PATH"
  cd "$WORKTREE_PATH" || return 1
  echo "➡ 디렉터리 변경 완료: $(pwd)"
  claude
else
  echo "Worktree 생성 실패."
  return 1
fi